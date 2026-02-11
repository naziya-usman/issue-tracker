import Pagination from "./components/Pagination";

// 1. Define the type for the Promise
interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: Props) {
  // 2. Await the searchParams promise
  const params = await searchParams;
  
  // 3. Convert the string param to a number for your component
  const currentPage = params.page ? parseInt(params.page) : 1;

  return (
    <Pagination 
      itemCount={100} 
      pageSize={10} 
      currentPage={currentPage} 
    />
  );
}