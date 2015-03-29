DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

CD $DIR/..

find . -name "*.js" -not -path "./node_modules/*" | xargs node_modules/jshint/bin/jshint

if [ $? -eq 0 ]; then
  node cl.js $@
else
  echo "Please fix jshint failures."
fi
