export const routes = Object.freeze({
  activity: "/activity",
  search: "/search",
  histories: "/histories",
  setting: "/setting",
  help: "/help",
  login: "/login",
  contentNew: "/contents/new",
  userPage: userDefinedId => `/${userDefinedId}`,
  content: contentId => `/contents/${contentId}`,
  questionAnswer: contentId => `/contents/${contentId}/answer`,
  answerHistoryShow: answerHistoryId => `/answer_histories/${answerHistoryId}`,
  news: newsId => `/news/${newsId}`,
});
