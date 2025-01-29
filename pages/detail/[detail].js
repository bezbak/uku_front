import {Header} from "../../containers/header";
import Detail from "../../components/Detail";
import { getDetailPublication } from "../../components/Detail/request";

const DetailPage = ({initialData}) => {
    return (
        <div>
            <Header/>
            <Detail initialData={initialData}/>
        </div>
    )
}

// Загрузка данных на сервере
export async function getServerSideProps(context) {
    const { detail } = context.query; // Получаем ID публикации из query-параметров
    const token = context.req.cookies.token; 
    try {
      const initialData = await getDetailPublication(detail, token);
  
      // Если данные отсутствуют, возвращаем пустой объект
      if (!initialData) {
        return {
          props: {
            initialData: {},
          },
        };
      }
  
      return {
        props: {
          initialData,
        },
      };
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
  
      // В случае ошибки возвращаем пустой объект
      return {
        props: {
          initialData: {},
        },
      };
    }
  }
  

export default DetailPage;