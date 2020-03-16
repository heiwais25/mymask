import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { BOOKMARK_DIALOG } from "../../constants";
import { ILatLng, IMap } from "../KakaoMap/types";
import { convertCoord2AddressAPI } from "../utils/maps";
import { addBookmark, getBookmarks, removeBookmark } from "../../utils/bookmark";
import { BookmarkData } from "../../utils/bookmark";
import BookmarkDialogPresenter from "./BookmarkDialogPresenter";
import { useCallback } from "react";

type Props = {
  map?: IMap;
  handleItemClick: (latLng: ILatLng, level?: number) => void;
};

export default ({ map, handleItemClick }: Props) => {
  const [id, setId] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [editEnable, setEditEnable] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const [name, setName] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<BookmarkData>();
  const location = useLocation();
  const [currentBookmark, setCurrentBookmark] = useState<BookmarkData>();
  const history = useHistory();

  useEffect(() => {
    if (open) {
      const bookmarks = getBookmarks();
      if (bookmarks) {
        setBookmarks(bookmarks);
      }
    }
  }, [open]);

  useEffect(() => {
    if (location.hash === BOOKMARK_DIALOG) {
      setOpen(true);
    } else {
      if (editOpen) {
        history.push({ hash: BOOKMARK_DIALOG });
      } else {
        setOpen(false);
      }
      closeForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash]);

  const setCurrentLocation = useCallback(
    async (center: ILatLng) => {
      try {
        if (!currentBookmark) {
          const address = await convertCoord2AddressAPI(center);
          setCurrentAddress(address);
        }
      } catch (err) {
        setCurrentAddress("");
      } finally {
      }
    },
    [setCurrentAddress, currentBookmark]
  );

  useEffect(() => {
    if (editOpen && map) {
      const container = document.getElementById("static_map");
      if (!currentBookmark) {
        setCurrentLocation(map?.getCenter());
        new window.kakao.maps.StaticMap(container, {
          center: map?.getCenter(),
          level: map?.getLevel()
        });
      } else {
        new window.kakao.maps.StaticMap(container, {
          center: currentBookmark.center,
          level: currentBookmark.zoom
        });
      }
    }
  }, [map, editOpen, setCurrentLocation]);

  const handleClose = () => {
    history.goBack();
  };

  const handleAddBookmark = () => {
    if (map) {
      const bookmarks = addBookmark({
        id: id,
        address: currentBookmark ? currentBookmark.address : currentAddress,
        center: currentBookmark ? currentBookmark.center : map.getCenter(),
        name,
        zoom: currentBookmark ? currentBookmark.zoom : map.getLevel()
      });
      if (bookmarks) {
        setBookmarks(bookmarks);
      }
      closeForm();
    }
  };

  const closeForm = () => {
    setCurrentBookmark(undefined);
    setCurrentAddress("");
    setEditOpen(false);
    setName("");
    setId("");
    setEditEnable(false);
  };

  const handleItemClickWithClose = (bookmark: BookmarkData) => {
    handleClose();
    handleItemClick(bookmark.center, bookmark.zoom);
  };

  const handleEditEnable = () => {
    setEditEnable(true);
  };

  const handleEditDisable = () => {
    setDeleteTarget(undefined);
    setEditEnable(false);
  };

  const handleEditStart = (bookmark: BookmarkData) => {
    setCurrentBookmark(bookmark);
    setName(bookmark.name);
    setId(bookmark.id);
    setCurrentAddress(bookmark.address);
    setCurrentLocation(bookmark.center);
    setDeleteTarget(undefined);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setCurrentBookmark(undefined);
    setEditOpen(false);
    closeForm();
  };

  const handleDeleteTargetChange = (bookmark?: BookmarkData) => {
    setDeleteTarget(bookmark);
  };

  const handleDeleteTarget = () => {
    if (deleteTarget) {
      const newBookmarks = removeBookmark(deleteTarget);
      if (newBookmarks) {
        setBookmarks(newBookmarks);
      }
      setDeleteTarget(undefined);
      if (newBookmarks?.length === 0) {
        setEditEnable(false);
      }
    }
  };

  return (
    <BookmarkDialogPresenter
      open={open}
      name={name}
      currentAddress={currentAddress}
      editOpen={editOpen}
      handleAddBookmark={handleAddBookmark}
      handleClose={handleClose}
      setEditOpen={setEditOpen}
      setName={setName}
      bookmarks={bookmarks}
      handleItemClickWithClose={handleItemClickWithClose}
      editEnable={editEnable}
      handleEditEnable={handleEditEnable}
      handleEditDisable={handleEditDisable}
      handleEditStart={handleEditStart}
      handleCloseEdit={handleCloseEdit}
      handleDeleteTargetChange={handleDeleteTargetChange}
      handleDeleteTarget={handleDeleteTarget}
      deleteTarget={deleteTarget}
    />
  );
};
