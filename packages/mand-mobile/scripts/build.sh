platform=$1
buildTarget=$2

echo "build $buildTarget in $platform platform"
export VUE_CLI_SKIP_DIRTY_GIT_PROMPT=true 

if [ "$platform"x = "all"x ]; then
  run-s "build:*"
else
  if [ "$buildTarget"x = "sfc"x ]; then
    libName="src"
  else
    libName=$buildTarget
  fi 
  vue-cli-service md-install --platform $platform --target sfc --output=$platform/$libName
fi
