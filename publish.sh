read -p "Commit description: " desc
webpack -p
git add dist
git commit -m "$desc"
git subtree push --prefix dist origin master
echo "Done uploading to master."
git add .
git commit -m "$desc"
git push
echo "Done pushing to dev."