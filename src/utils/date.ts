import { Timestamp } from "firebase/firestore";

/** Timestampから YYYY/MM/DD hh:mm:ss 形式に変換
 * @param {Timestamp}
 * @returns {string} - YYYY/MM/DD hh:mm:ss
 */
export const formatTimestamp = (timestamp: Timestamp): string => {
  const date = timestamp.toDate();

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};
