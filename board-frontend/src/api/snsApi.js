import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_URL

//axios 인스턴스 생성
const boardApi = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true, // 세션 쿠키를 요청에 포함
})

//회원가입
export const registerUser = async (userData) => {
   try {
      //userData: 회원가입 창에서 입력한 데이터
      const response = await boardApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error //request 할떄 오류 발생시 에러르 registerUser() 함수를 실행한 곳으로 던짐
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await boardApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await boardApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태확인
export const checkAuthStatus = async () => {
   try {
      const response = await boardApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게시물 등록
export const createPost = async (postData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      const response = await boardApi.post('/post', postData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게시물 가져오기
export const fetchPosts = async () => {
   try {
      const response = await boardApi.get('/post')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//특정 게시물 가져오기
export const getPostById = async (id) => {
   try {
      const response = await boardApi.get(`/post/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게시물 수정하기
export const updatePost = async (id, postData) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data', // 데이터 형식 지정
         },
      }
      for (const x of postData.entries()) {
         console.log(x)
      }
      const response = await boardApi.put(`/post/${id}`, postData, config)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//게시물삭제
export const deletePost = async (id, postData) => {
   try {
      const response = await boardApi.delete(`/post/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
