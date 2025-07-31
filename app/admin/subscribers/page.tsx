import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Subscriber } from "@/lib/types";
import { serverDb } from "@/utils/supabase/database";

export const metadata = {
  title: "Subscribers - Admin Dashboard",
};

export default async function AdminSubscribersPage() {
  const { data: subscribers, error } = await serverDb.subscribers.getAll();

  if (error) {
    console.error("Error fetching subscribers:", error);
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Newsletter Subscribers
          </h1>
          <p className="text-gray-600">Manage your email subscribers</p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-red-500">Error loading subscribers. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Newsletter Subscribers
        </h1>
        <p className="text-gray-600">Manage your email subscribers</p>
      </div>

      {!subscribers || subscribers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No subscribers yet
            </h3>
            <p className="text-gray-600 text-center">
              Subscribers will appear here when people sign up for your newsletter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Subscribers ({subscribers.length})</CardTitle>
            <CardDescription>
              People who have subscribed to your newsletter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{subscriber.email}</p>
                    <p className="text-sm text-gray-600">
                      Subscribed: {formatDate(subscriber.subscribed_at)}
                    </p>
                  </div>
                  <Badge
                    variant={subscriber.confirmed ? "default" : "secondary"}
                  >
                    {subscriber.confirmed ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
