
import React from "react";
import { AssignmentDetails } from "./assignmentSubAnalyze";


export default function TeacherAssignDetail({
  params,
}: {
  params: Promise<{ assignId: string }>;
}) {
  const resolvedParams = React.use(params); // unwrap хийнэ
  const assignId = resolvedParams.assignId;

  return (
    <div>
      <AssignmentDetails assignmentId={assignId} />
    </div>
  );
}
