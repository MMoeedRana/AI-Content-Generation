"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";// Drizzle ORM setup
import { AIOutput } from "@/utils/schema";
import { eq, desc } from "drizzle-orm"; // Ensure `desc` is imported
import { Button } from "@/components/ui/button";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

const History = () => {
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const userId = "currentUserId"; // Replace with actual user ID

      try {
        const data = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, userId))
          .orderBy(desc(AIOutput.createdAt)); // Correct usage of `desc`
        setHistoryList(data as HISTORY[]);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">History</h1>
      {historyList.length === 0 ? (
        <p>No history found.</p>
      ) : (
        historyList.map((item: HISTORY, index: number) => (
          <div
            key={item.id}
            className="grid grid-cols-7 my-5 py-3 px-3 border-b"
          >
            <h2 className="col-span-2 flex gap-2 items-center">
              <img
                src={`/icons/${item.templateSlug}.png`}
                alt={item.templateSlug}
                className="w-6 h-6"
              />
              {item.templateSlug}
            </h2>
            <h2>{new Date(item.createdAt).toLocaleString()}</h2>
            <h2>{item.aiResponse.length} characters</h2>
            <h2>
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => navigator.clipboard.writeText(item.aiResponse)}
              >
                Copy
              </Button>
            </h2>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
