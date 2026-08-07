Add-Type -AssemblyName System.Drawing
$sourceDir = 'E:\vibe_coding\rocketbeans\logo\comic'
$destDir = 'E:\vibe_coding\rocketbeans\htbah-tool\assets'

Get-ChildItem -Path $sourceDir -Filter '*.png' | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $isBg = $_.Name -like 'bg_*'
    
    if ($isBg) {
        $newWidth = 1920
        $newHeight = [math]::Round($img.Height * (1920 / $img.Width))
    } else {
        $newHeight = 800
        $newWidth = [math]::Round($img.Width * (800 / $img.Height))
    }
    
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
    Write-Host "Proportionally resized and moved: $newName"
}
