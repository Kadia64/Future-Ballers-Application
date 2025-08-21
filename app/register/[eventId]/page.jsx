import React from 'react';
import { dummyEvents } from '../../data/dummyData';
// Using static version since you deploy via out folder
import TournamentRegistrationClient from './TournamentRegistrationClientStatic';

export async function generateStaticParams() {
  const eventIds = [];
  
  // Add all boys event IDs
  dummyEvents.boys.forEach(event => {
    eventIds.push({ eventId: event.id });
  });
  
  return eventIds;
}

export default async function TournamentRegistrationPage({ params }) {
  const { eventId } = await params;
  const event = dummyEvents.boys.find(e => e.id === eventId);
  
  return <TournamentRegistrationClient event={event} eventId={eventId} />;
}