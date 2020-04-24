# Watcher Backend

To deploy backend to production execute the following commands (in **root directory** on **master** branch):

```git subtree push --prefix backend/ origin production```

The above command takes the sub-folder called 'backend' and pushes its content to origin/production. This means that **production** branch *contains backend source files only*.

