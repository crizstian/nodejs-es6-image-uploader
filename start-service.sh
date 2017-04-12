cd ..

cd easycast-angular

mv dist/ ../easycast-front-server/src/server

bash < create-image.sh

docker run --name frontend --hostname frontend -p 9001:9000 -d frontend
