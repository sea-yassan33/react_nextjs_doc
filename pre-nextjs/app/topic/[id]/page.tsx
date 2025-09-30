"use client";
import { useParams } from 'next/navigation';
import { documents } from '@/components/Topic/document';
import Markdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import remarkGfm from 'remark-gfm';
import { tv } from 'tailwind-variants';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const DocumentDetail = () => {
  const twStayles = tv({
    variants: {
      style: {
        container:
          "bg-white text-gray-800 flex flex-col justify-center items-center mb-6 px-4 sm:px-6 lg:px-8", 
        content:
          "w-full sm:w-[90%] md:w-[80%] lg:w-[60%] bg-white shadow-lg p-4 sm:p-6 lg:p-8 box-border", 
      },
    },
  });

  const params = useParams();
  const id = params.id;

  // IDからドキュメントを取得
  const document = documents.find((doc) => doc.id === Number(id));

  // ドキュメントが存在しない場合
  if (!document) {
    return <p className="text-center text-gray-600">ドキュメントが見つかりませんでした。</p>;
  }

  return (
    <div className={twStayles({style:'container'})}>
      <div className={twStayles({style:'content'})}>
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-left">{document.title}</h1>
          <div className="text-center text-gray-600">
            <h2 className="text-lg sm:text-xl text-left">更新日: {document.updatedAt}</h2>
          </div>

        </header>
        <section className="prose max-w">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {document.content}
          </Markdown>
        </section>
        <Link href="/topic" className='float-right'>
          <Button variant="secondary" className='m-2'>一覧に戻る</Button>
        </Link>
      </div>  
    </div>
  );
};

export default DocumentDetail;