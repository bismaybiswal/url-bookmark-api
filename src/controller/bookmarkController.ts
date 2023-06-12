// userController.ts
import { Request, Response } from 'express';
import { Bookmark } from '../models/bookmark';
import { DataStore } from '../data';
const dataStore = DataStore.getInstance();

export const addBookmark = async (req: Request, res: Response): Promise<void> => {
  let status = 201;
  let responseBody;
  const bookmark : Bookmark = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url
  };

  //adding to the DB
  try {
    await dataStore.addBookmark(bookmark);
    responseBody = bookmark;
  } catch(err) {
    console.log(err)
    status = 500;
    responseBody = {
      "message": "An error occurred"
    }
  }

  res.status(status).json(responseBody);
};

export const listBookmark = async (req: Request, res: Response): Promise<void> => {
  let status = 200;
  let responseBody;

  //adding to the DB
  try {
    const bookmarks =  await dataStore.listBookmarks();
    responseBody = bookmarks;
  } catch(err) {
    console.log(err);
    status = 500;
    responseBody = {
      "message": "An error occurred"
    }
  }

  res.status(status).json(responseBody);
};

export const deleteBookmark = async (req: Request, res: Response): Promise<void> => {
  let status = 200;
  let responseBody;
  const bookmarkId = req.query.bookmarkId as string ;

  //adding to the DB
  try {
    await dataStore.deleteBookmark(bookmarkId);
    responseBody = {
      "message": "Successfully deleted bookmark : "+bookmarkId
    };
  } catch(err) {
    status = 500;
    responseBody = {
      "message": "An error occurred"
    }
  }

  res.status(status).json(responseBody);
};


export const getBookmark = async (req: Request, res: Response): Promise<void> => {
  let status = 200;
  let responseBody;
  const id = req.query.bookmarkId;

  //adding to the DB
  try {
    let res = await dataStore.getBookmark(id);
    responseBody = res;
  } catch(err) {
    status = 500;
    responseBody = {
      "message": "An error occurred"
    }
  }

  res.status(status).json(responseBody);
};
