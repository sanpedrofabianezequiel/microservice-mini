
docker build -t name .

docker run image

apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: test/posts:0.0.1