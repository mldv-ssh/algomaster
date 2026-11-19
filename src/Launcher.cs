using System;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows.Forms;
using Microsoft.Win32;

[assembly: AssemblyTitle("AlgoMaster")]
[assembly: AssemblyDescription("Cours interactif d'algorithmique (quiz, flashcards, exercices)")]
[assembly: AssemblyProduct("AlgoMaster")]
[assembly: AssemblyCompany("AlgoMaster")]
[assembly: AssemblyCopyright("2026")]
[assembly: AssemblyVersion("1.2.0.0")]
[assembly: AssemblyFileVersion("1.2.0.0")]

// Lanceur AlgoMaster : extrait l'appli HTML embarquée et l'ouvre dans une fenêtre Edge dédiée (mode app).
static class Launcher
{
    [STAThread]
    static void Main()
    {
        try
        {
            string root = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "AlgoMaster");
            string appDir = Path.Combine(root, "app");
            Directory.CreateDirectory(appDir);
            string html = Path.Combine(appDir, "index.html");

            using (Stream s = Assembly.GetExecutingAssembly().GetManifestResourceStream("index.html"))
            using (FileStream f = File.Create(html))
                s.CopyTo(f);

            string url = new Uri(html).AbsoluteUri;
            string edge = FindEdge();
            if (edge != null)
            {
                string profile = Path.Combine(root, "profile");
                Process.Start(new ProcessStartInfo(edge,
                    "--app=\"" + url + "\" --user-data-dir=\"" + profile + "\" --window-size=1400,900 --no-first-run --no-default-browser-check --disable-features=Translate")
                    { UseShellExecute = false });
            }
            else
            {
                Process.Start(new ProcessStartInfo(html) { UseShellExecute = true });
            }
        }
        catch (Exception ex)
        {
            MessageBox.Show("Impossible de lancer AlgoMaster :\n" + ex.Message, "AlgoMaster", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    static string FindEdge()
    {
        foreach (RegistryKey hive in new[] { Registry.CurrentUser, Registry.LocalMachine })
        {
            using (RegistryKey k = hive.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe"))
            {
                string p = k == null ? null : k.GetValue("") as string;
                if (!string.IsNullOrEmpty(p) && File.Exists(p)) return p;
            }
        }
        foreach (string p in new[] {
            Environment.ExpandEnvironmentVariables(@"%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"),
            Environment.ExpandEnvironmentVariables(@"%ProgramFiles%\Microsoft\Edge\Application\msedge.exe") })
            if (File.Exists(p)) return p;
        return null;
    }
}
