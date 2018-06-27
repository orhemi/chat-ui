export class Message {
  public isMyMessage;

  constructor(public userId: string,
              public avatar: string,
              public username: string,
              public text: string) {
  }
}
