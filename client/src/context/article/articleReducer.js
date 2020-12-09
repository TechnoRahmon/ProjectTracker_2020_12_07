import {
  GET_ARTICLES,
  ADD_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLE_DETAILS,
  ERROR_ARTICLE,
  SHOW_SPINNER
} from "../types";

export const ArticleReducer = (state, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      // console.log("action: ",action.payload)
      return {
        ...state,
        isLoading: true, //updated to false
        articles: action.payload, showSpinner:false ,
      };
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [action.payload, ...state.articles],
        isLoading: false, //updated to false
        addSuccess: action.success, //updated
         showSpinner:false ,
      };


      case GET_ARTICLE_DETAILS:
        return {
          ...state,
          currentArticle: action.payload,
          isLoading: true,
          showSpinner:false ,
        };


    case DELETE_ARTICLE:
      // this is helful for debbuging
      const newArticle = state.articles.filter(
        (article) => article._id !== action.payload
      );
      return { ...state, projects: newArticle ,
           addSuccess: action.success,
           isLoading: false,
           showSpinner:false ,};

    case ERROR_ARTICLE:
      return {
        ...state,
        error: action.payload,
        isLoading: true, //updated to true
        addSuccess: action.success, //updated
        showSpinner:false ,
      };

    case SHOW_SPINNER:
        console.log('show spinner reducer');
            return{
            ...state,
            showSpinner:true,
            }


    default: {
      return state;
    }
  }
};
