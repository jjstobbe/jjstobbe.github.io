read -p "Commit description: " desc
webpack -p
git add dist
git commit -m "$desc"
git subtree push --prefix dist origin master
echo "Done."
git add .
git commit -m "$desc"
git push