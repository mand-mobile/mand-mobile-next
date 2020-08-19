componentName=$1 

if [ $componentName ]; then
  jest --no-cache --runInBand --verbose --silent src/$componentName/test/*.spec.js
else
  jest --no-cache --runInBand --verbose --silent src/*/test/*.spec.js
fi