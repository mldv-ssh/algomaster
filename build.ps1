# Build AlgoMaster :
#  - index.html (racine du repo) : appli autonome, servie par GitHub Pages
#  - Bureau\AlgoMaster.exe et Bureau\AlgoMaster.html : versions à partager
$ErrorActionPreference = "Stop"
$src  = Join-Path $PSScriptRoot "src"
$out  = Join-Path $PSScriptRoot "out"
New-Item -ItemType Directory -Force $out | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding($false)
$desktop = [Environment]::GetFolderPath("Desktop")

# 1. Icône (PNG 256, réutilisé en .ico et en icône d'écran d'accueil)
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap 256,256
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = "AntiAlias"; $g.TextRenderingHint = "AntiAliasGridFit"
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$r = 56; $path.AddArc(0,0,$r,$r,180,90); $path.AddArc(256-$r,0,$r,$r,270,90); $path.AddArc(256-$r,256-$r,$r,$r,0,90); $path.AddArc(0,256-$r,$r,$r,90,90); $path.CloseFigure()
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush (New-Object System.Drawing.Point 0,0),(New-Object System.Drawing.Point 256,256),([System.Drawing.Color]::FromArgb(124,92,255)),([System.Drawing.Color]::FromArgb(34,211,238))
$g.FillPath($brush,$path)
$font = New-Object System.Drawing.Font "Consolas",96,([System.Drawing.FontStyle]::Bold)
$sf = New-Object System.Drawing.StringFormat; $sf.Alignment="Center"; $sf.LineAlignment="Center"
$g.DrawString("{ }",$font,[System.Drawing.Brushes]::White,(New-Object System.Drawing.RectangleF 0,0,256,256),$sf)
$ms = New-Object IO.MemoryStream; $bmp.Save($ms,[System.Drawing.Imaging.ImageFormat]::Png); $png = $ms.ToArray()
$ico = New-Object IO.MemoryStream; $w = New-Object IO.BinaryWriter $ico
$w.Write([UInt16]0); $w.Write([UInt16]1); $w.Write([UInt16]1)
$w.Write([byte]0); $w.Write([byte]0); $w.Write([byte]0); $w.Write([byte]0)
$w.Write([UInt16]1); $w.Write([UInt16]32); $w.Write([UInt32]$png.Length); $w.Write([UInt32]22); $w.Write($png); $w.Flush()
[IO.File]::WriteAllBytes("$out\app.ico", $ico.ToArray())
$iconUri = "data:image/png;base64," + [Convert]::ToBase64String($png)

# 2. HTML autonome
$css  = [IO.File]::ReadAllText("$src\style.css", $utf8)
$js   = (@("course.js","questions.js","interp.js","exos.js","chat.js","app.js") | ForEach-Object { [IO.File]::ReadAllText("$src\$_", $utf8) }) -join "`n;`n"
$tpl  = [IO.File]::ReadAllText("$src\index.html", $utf8)
$html = $tpl.Replace("/*CSS*/", $css).Replace("/*JS*/", $js).Replace("/*ICON*/", $iconUri)
[IO.File]::WriteAllText("$PSScriptRoot\index.html", $html, $utf8)

# 3. Lanceur Windows + copies sur le Bureau
$csc = "$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
$exe = Join-Path $desktop "AlgoMaster.exe"
& $csc /nologo /target:winexe /optimize+ "/out:$exe" "/win32icon:$out\app.ico" "/resource:$PSScriptRoot\index.html,index.html" /r:System.Windows.Forms.dll "$src\Launcher.cs"
if ($LASTEXITCODE -ne 0) { throw "Compilation échouée" }
Copy-Item "$PSScriptRoot\index.html" (Join-Path $desktop "AlgoMaster.html") -Force
Write-Output "OK -> $exe"
