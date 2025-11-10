import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import { table } from 'console';

function Repositories() {
  const getGerepositories = async () => {
  const response = axios.get('https://api.github.com/search/repositories?q=korit_07')
  return response.data.items;
}
  const { isLoading, isError, data } = useQuery({
    queryKey: ['repositories'],
    queryFn: getGerepositories
  })
  if (isLoading) {
    return <h1>Loading ... </h1>
  }
  if (isError) {
    return <h1>오류가 발생했습니다 ... </h1>
  }
  else {
    return (
      <table>
        
      </table>
    )
  }

}







export default Repositories