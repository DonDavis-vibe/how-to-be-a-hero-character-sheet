Add-Type -AssemblyName System.Drawing
$sourceDir = 'E:\vibe_coding\rocketbeans\logo\comic'
$destDir = 'E:\vibe_coding\rocketbeans\htbah-tool\assets'

Get-ChildItem -Path $sourceDir -Filter '*.png' | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $isBg = $_.Name -like 'bg_*'
    $newWidth = if ($isBg) { 1920 } else { 800 }
    $newHeight = if ($isBg) { 1080 } else { 800 }
    
    $bmp = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
    
    $newName = $_.Name.Replace('.png', '.jpg')
    $destPath = Join-Path $destDir $newName
    
    $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    
    $graph.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    Write-Host "Compressed and moved: $newName"
}
