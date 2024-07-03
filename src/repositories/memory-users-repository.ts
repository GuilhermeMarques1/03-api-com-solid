export class MemoryUsersRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private users: any[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(data: any) {
    this.users.push(data)
  }

  log() {
    console.log(this.users)
  }
}
