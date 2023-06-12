import { Bookmark } from "../models/bookmark";
import CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb("aware-pea-coat-fishCyclicDB");
const bookmarks = db.collection("bookmarks")

export class DataStore {

    private static instance: DataStore | null = null;

    public static getInstance(): DataStore {
       if(!DataStore.instance){
        DataStore.instance = new DataStore();
       }
       return DataStore.instance;
    }

   private generateId(input: String): string {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const inputLength = input.length;
  
    for (let i = 0; i < inputLength; i++) {
      const char = input.charAt(i);
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);
      randomString += char + randomChar;
    }
  
    return randomString;
   }


   public async addBookmark(bookmark: Bookmark): Promise<void> {
       const generateId = this.generateId(bookmark.title);
       console.log("Generate ID : "+generateId);
       await bookmarks.set(generateId, bookmark);
   }

   public async getBookmark(bookmarkId: any): Promise<any> {
    return await bookmarks.get(bookmarkId)
   }

   public async listBookmarks(): Promise<any[]> {
    return await bookmarks.list();
   }

   public async deleteBookmark(bookmarkId:String) : Promise<void> {
    await bookmarks.delete("generateId");
    await bookmarks.delete(bookmarkId);
}
}

