
$invocation = (Get-Variable MyInvocation -Scope 0).Value
$scaffoldDir = (Get-Item (Split-Path -parent $invocation.MyCommand.Path)).parent.FullName

function global:Join-Paths($parent)
{
    $result = $parent
    foreach ($child in $args)
        {$result = Join-Path $result $child}
    $result
}

function ln($source, $link)
{
    $ln = join-paths $scaffoldDir Scripts junction.exe
    & $ln $link $source        
}

$ln = join-paths $PWD bin junction.exe
function init([string] $targetDir)
{
    if(!$targetDir){
        echo "usage: Scaffold.ps1 init <Target Directory>"
        exit -1;
    }
    if (Test-Path $targetDir)
    {
        echo "target directory already exists"
        exit -1;
    }
    git clone $scaffoldDir $targetDir
    $deletes = ".git", "Scripts"
    foreach($delete in $deletes)
    {
        $full = join-path $targetDir $delete
        rm $full -recurse -force
    }
    $name = Split-Path -Leaf $targetDir 
    mv (join-path $targetDir Scaffold.sln) (join-path $targetDir ($name+".sln"))
    $links = "Scaffold", "App/Views/Scaffold", "App/Scripts/Scaffold", "App/Content/Scaffold", "App/Controllers/Scaffold"
    foreach($link in $links)
    {
        $delete = join-path $targetDir $link
        $source = join-path $scaffoldDir $link
        rm $delete -recurse -force
        #mkdir $delete
        ln $source $delete
    }

}
if($args[0] -eq "init")
{
    init($args[1])
}