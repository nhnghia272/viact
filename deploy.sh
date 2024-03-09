docker-compose down

cd backend
npm install
rm -rf dist
npm run build

cd ..
docker rmi -f viact_frontend
docker rmi -f viact_backend
docker-compose up -d