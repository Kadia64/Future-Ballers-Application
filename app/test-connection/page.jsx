'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState('Checking connection...')
  const [registrations, setRegistrations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      // Check if Supabase is configured
      if (!supabase) {
        setStatus('❌ Supabase not configured - Please add your API keys to .env.local')
        setError('Missing environment variables')
        return
      }

      // Try to fetch registrations
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false })

      if (error) {
        setStatus('❌ Connection failed')
        setError(error.message)
      } else {
        setStatus('✅ Successfully connected to Supabase!')
        setRegistrations(data || [])
      }
    } catch (err) {
      setStatus('❌ Connection error')
      setError(err.message)
    }
  }

  const testSubmission = async () => {
    try {
      const testData = {
        eventId: 'e1',
        eventName: 'Test Tournament',
        teamName: 'Test Team ' + Date.now(),
        grade: '5th Grade',
        gender: 'boys',
        division: '1',
        additionalNotes: 'This is a test submission'
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      })

      const result = await response.json()

      if (response.ok) {
        alert('Test submission successful! Check your Supabase dashboard.')
        checkConnection() // Refresh the list
      } else {
        alert('Test submission failed: ' + result.error)
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="container mx-auto p-6 bg-fba-gray min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8">Supabase Connection Test</h1>
        
        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Connection Status</h2>
          <p className="text-lg text-black mb-2">{status}</p>
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Environment Variables</h2>
          <div className="space-y-2 text-black">
            <p>
              <strong>NEXT_PUBLIC_SUPABASE_URL:</strong>{' '}
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}
            </p>
            <p>
              <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong>{' '}
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Recent Registrations ({registrations.length})
          </h2>
          {registrations.length > 0 ? (
            <div className="space-y-3">
              {registrations.map((reg) => (
                <div key={reg.id} className="p-3 bg-gray-50 rounded border border-gray-200">
                  <p className="text-black">
                    <strong>{reg.team_name}</strong> - {reg.grade} - Division {reg.division}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(reg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No registrations found</p>
          )}
        </div>
      </div>
    </div>
  )
}