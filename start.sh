npm install yarn -g
cd eim_frontend
yarn install
yarn run build
mkdir ../eim_backend/public
cp ./build/* ../eim_backend/public
cd ../
cd eim_backend
yarn install
yarn run server