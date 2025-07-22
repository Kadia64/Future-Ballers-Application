import React from 'react';
import { dummyTeams } from '../../data/dummyData';
import TeamDetailClient from './TeamDetailClient';

export async function generateStaticParams() {
  const teamIds = [];
  
  // Add all boys team IDs
  dummyTeams.boys.forEach(team => {
    teamIds.push({ teamId: team.id });
  });
  
  // Add all girls team IDs
  dummyTeams.girls.forEach(team => {
    teamIds.push({ teamId: team.id });
  });
  
  return teamIds;
}

export default async function TeamDetailPage({ params }) {
  const { teamId } = await params;
  
  // Try to find team in boys array first, then girls
  let team = dummyTeams.boys.find(t => t.id === teamId);
  let gender = 'boys';
  
  if (!team) {
    team = dummyTeams.girls.find(t => t.id === teamId);
    gender = 'girls';
  }
  
  return <TeamDetailClient team={team} teamId={teamId} />;
}