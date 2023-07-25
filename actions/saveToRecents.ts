"use client";

import { recentsListItem } from "@/types/recentsListItem";

export default function saveToRecents(item: recentsListItem) {
  const recentsList: recentsListItem[] = JSON.parse(
    localStorage.getItem("recents") || "[]"
  );

  const index = recentsList.findIndex(
    (recentItem) => recentItem.id === item.id
  );

  if (index !== -1) {
    recentsList.splice(index, 1);
  }

  recentsList.unshift(item);
  localStorage.setItem("recents", JSON.stringify(recentsList));
}
