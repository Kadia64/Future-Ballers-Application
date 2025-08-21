import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase is not configured')
      return NextResponse.json(
        { error: 'Database connection not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    
    const {
      eventId,
      eventName,
      teamName,
      grade,
      gender,
      division,
      additionalNotes
    } = body

    // Validate required fields
    if (!eventId || !teamName || !grade || !gender || !division) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // First, get the tournament ID from the tournaments table
    const { data: tournament, error: tournamentError } = await supabase
      .from('tournaments')
      .select('id')
      .eq('event_id', eventId)
      .single()

    if (tournamentError || !tournament) {
      console.error('Tournament lookup error:', tournamentError)
      // If tournament doesn't exist, we'll still save the registration with just the event_id
    }

    // Insert the registration
    const { data, error } = await supabase
      .from('registrations')
      .insert([
        {
          tournament_id: tournament?.id || null,
          tournament_event_id: eventId,
          tournament_name: eventName,
          team_name: teamName,
          grade: grade,
          team_type: gender,
          division: parseInt(division),
          additional_notes: additionalNotes || null,
          registration_status: 'pending',
          payment_status: 'unpaid'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Registration error:', error)
      return NextResponse.json(
        { error: 'Failed to save registration. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Registration saved successfully',
      registrationId: data.id
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}