import { BOOKMARK_KEY } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { ILatLng } from "../Components/KakaoMap/types";

export type BookmarkFormData = {
  id?: string;
  name: string;
  address: string;
  center: ILatLng;
  zoom: number;
};

export type BookmarkData = {
  id: string;
  name: string;
  address: string;
  center: ILatLng;
  zoom: number;
};

const fillBookmarkLatlng = (bookmarks: BookmarkData[]) => {
  return bookmarks.map(item => {
    const { center, ...extra } = item;
    return {
      center: new window.kakao.maps.LatLng(center.Ha, center.Ga),
      ...extra
    };
  });
};

export const getBookmarks = () => {
  const rawBookmarks = localStorage.getItem(BOOKMARK_KEY);
  if (rawBookmarks) {
    try {
      const bookmarks = JSON.parse(rawBookmarks) as BookmarkData[];
      return fillBookmarkLatlng(bookmarks);
    } catch (err) {
      console.log(err);
      toast.error("북마크 설정이 잘못되었습니다");
      throw Error(err);
    }
  }
};

export const addBookmark = (bookmark: BookmarkFormData) => {
  const rawBookmarks = localStorage.getItem(BOOKMARK_KEY);
  try {
    const bookmarks = JSON.parse(rawBookmarks || "[]") as BookmarkData[];
    if (bookmark.id) {
      const idx = bookmarks.findIndex(el => el.id === bookmark.id);
      if (idx >= 0) {
        bookmarks[idx] = bookmark as BookmarkData;
      }
    } else {
      bookmark.id = uuidv4();
      bookmarks.push(bookmark as BookmarkData);
    }

    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    return fillBookmarkLatlng(bookmarks);
  } catch (err) {
    console.log(err);
    toast.error("북마크 설정이 잘못되었습니다");
  }
};

export const removeBookmark = (bookmark: BookmarkData) => {
  const rawBookmarks = localStorage.getItem(BOOKMARK_KEY);
  if (rawBookmarks) {
    try {
      const bookmarks = JSON.parse(rawBookmarks) as BookmarkData[];
      const newBookmarks = bookmarks.filter(item => item.id !== bookmark.id);
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(newBookmarks));
      return fillBookmarkLatlng(newBookmarks);
    } catch (err) {
      console.log(err);
      toast.error("북마크 설정이 잘못되었습니다");
    }
  }
};
