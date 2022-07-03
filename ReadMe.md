#### truffle 教學網址
##### https://lalajun.github.io/2018/08/07/truffle/

```
// 下載包
truffle unbox pet-shop
```


```
truffle unbox	引用官网、社区的模板和实例
truffle compile	编译工程，编译输出位于build/contracts
truffle migrate	运行部署脚本
truffle migrate --reset	当增加或者删除了某个合约后，可以执行命令重新部署合约
truffle deploy	运行部署脚本

// truffle deploy, alias = truffle migrate
truffle deploy --network ropsten
```


#### How to run App

```
// 先部署合約 --reset表示資料夾 ./migrations/ 下的 js 全部重新跑一次
// --network ropsten 指定部署在測試網
truffle deploy --reset --network ropsten
// 開啟伺服器
npm run dev
```


#### IPFS
##### https://learnblockchain.cn/2018/12/25/use-ipfs/
1. 使用 IPFS Client
2. 使用 IPFS CLI
    ```
    // 初始化
    ipfs init 
    // 背景執行 ipfs
    ipfs daemon
    // 添加圖片
    ipfs add "FILE PATH"
    // 添加資料夾
    ipfs add -r "DIR PATH"
    ```

##### 補充

```
// 初始化
ipfs init 

// 修改配置
vim ~/.ipfs/coinfg

// 上傳到本地節點
ipfs add "FILE_PATH"

/* 要同步到網路上 需要開啟 daemon
   裡面會看到 Gateway (readonly) server listening on /ip4/127.0.0.1/tcp/8080
   表示 http://127.0.0.1:8080
   實際訪問範例有兩種方式
   1. 直接 ipfs 後面接檔案的 hash
   http://127.0.0.1:8080/ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8
   2. 資料夾名稱(也是 hash)/檔案名稱
   http://127.0.0.1:8080/ipfs/QmSTR2i33G333BhFpaYW8mAm8toX2qXJJjpKdufWYdnAxD/boxer.jpeg
*/
// Take your node online
ipfs daemon

// 使用 ipns 解決更新問題
ipfs add "更新後的同名檔案"
ipfs name publish Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8

輸出如下
>>> Published to k51qzi5uqu5di9wuahrqxnzi83p4ftyh6rmaggy4p4wc7mkw7vpib29m5rfhey: /ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8

注意底下網址是 "ipns", hash 是 published 後面
http://127.0.0.1:8080/ipns/k51qzi5uqu5di9wuahrqxnzi83p4ftyh6rmaggy4p4wc7mkw7vpib29m5rfhey
或者使用 ipfs
http://127.0.0.1:8080/ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8

因為有開啟 daemon 表示節點是上線狀態的 所以可以用公開的 gateway
https://ipfs.io/ipfs/Qmehg3LhFH68f743uTE9HoXCpjSYUmhaLAPSGbsRn2RBM8
https://ipfs.io/ipns/k51qzi5uqu5di9wuahrqxnzi83p4ftyh6rmaggy4p4wc7mkw7vpib29m5rfhey
```

#### 如果 ipfs.io 上面依然找不到檔案 (例如某 json file) 請嘗試

```
// 向網路告知要提供某檔案
ipfs dht provide <cid>
```




#### Verify Contract Code

```
// 安裝這個套件
npm install truffle-flattener -g
// truffle-flattener "要 verify 的合約位置" "要輸出成 single file 的 new file name"
truffle-flattener ./contracts/EGGNft.sol > ./contracts/EGGNftFlattener.sol
```
