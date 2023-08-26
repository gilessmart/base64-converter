# Create a build from the latest main branch and push it to the gh-pages branch

URL=$(git ls-remote --get-url origin)

rm -rf deploy
git clone $URL deploy

cd deploy
npm run build

for f in * ; do
    if [[ $f != build* ]]; then
        rm -rf $f
    fi
done

mv build/* .
rmdir build
git add .
git commit -m "Deploy"
git push -f origin master:gh-pages
