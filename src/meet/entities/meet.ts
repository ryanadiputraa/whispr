export type MeetSessions = {
  [meetId: string]: {
    [client: string]: boolean; // true = moderator
  };
};
