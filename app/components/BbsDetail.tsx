import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Props = {
  id: number
  title: string;
  content: string;
  userName: string;
  createdAt: Date
};

export default async function BbsDetailPage({
    id,
    title,
    content,
    userName,
    createdAt,
  }: Props) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle
            className="text-blue-500 font-bold text-xl"
          >
            </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-3">
            <p>投稿者：{userName} |</p>
            <p>作成日：{createdAt.toLocaleDateString()}</p>
          </div>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};
