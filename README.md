# bot_telegram_todo

### Description : 할일 목록을 관리하는 텔레그램 챗봇

1. 텔레그램 앱에서 동작
2. Node.js 로 구현 
3. 빌드는 AWS EC2 에 배포
4. 데이타는 Firebase firestore에 저장


### 봇 사용법 
- URL : http://t.me/toto_todo_bot
- 사용법
  - list
  - add <할일>
  - done <목록번호>
- ![이미지](./etc/20180730_211201.jpg)

### Tech

- Node.js
  - npm i --save telegram-node-bot
  - npm i --save firebase-admin
- 플랫폼 : Telegram Bot API
- 인프라 : AWS, Firebase 

### Reference

- Telegram Bot API    : https://core.telegram.org/bots/api
- Telegram-node-bot   : https://github.com/naltox/telegram-node-bot
- Firebase-admin-node : https://github.com/firebase/firebase-admin-node

### Commit history

- 내부 변수에 데이타 저장 : git checkout 61e8843
- 세션에 데이타 저장      : git checkout c7870c2
- DB에 데이타 저장        : git checkout dd02872
