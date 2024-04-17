export class Evenement {
    toLowerCase() {
      throw new Error('Method not implemented.');
    }
    id: number;
    titre: string;
    date: Date;
    lieu: string;
  
    constructor(id: number, titre: string, date: Date, lieu: string) {
      this.id = id;
      this.titre = titre;
      this.date = date;
      this.lieu = lieu;
    }
  }