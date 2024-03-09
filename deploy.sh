docker-compose down
docker rmi -f viact_backend
docker rmi -f viact_frontend

cd backend
npm install
rm -rf dist
npm run build

cd ../frontend
npm install
rm -rf dist
npm run build

cd ..
docker-compose up -d