import React from 'react';
import { dummyEvents } from '../../data/dummyData';
import EventDetailClient from './EventDetailClient';

export async function generateStaticParams() {
  const eventIds = [];
  
  // Add all boys event IDs
  dummyEvents.boys.forEach(event => {
    eventIds.push({ eventId: event.id });
  });
  
  return eventIds;
}

export default async function EventDetailPage({ params }) {
  const { eventId } = await params;
  const event = dummyEvents.boys.find(e => e.id === eventId);
  
  return <EventDetailClient event={event} eventId={eventId} />;
}