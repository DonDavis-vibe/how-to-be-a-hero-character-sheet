Add-Type -AssemblyName System.Drawing
$sourceDir = 'E:\vibe_coding\rocketbeans\logo\comic'
Get-ChildItem -Path $sourceDir -Filter '*.png' | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Host "$($_.Name): $($img.Width)x$($img.Height)"
    $img.Dispose()
}
