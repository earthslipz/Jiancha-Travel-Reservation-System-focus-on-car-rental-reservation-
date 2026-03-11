import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', role: '' })
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) return navigate('/login')
    fetchProfile()
  }, [navigate])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const res = await api.get('/users/profile')
      setProfile(res.data)
      setEditName(res.data.name)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load profile')
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editName.trim()) {
      toast.error('Name cannot be empty')
      return
    }

    setSaving(true)
    try {
      await api.put('/users/profile', { name: editName.trim() })
      setProfile({ ...profile, name: editName.trim() })
      toast.success('✅ Profile updated successfully')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground mb-8">View and edit your account information</p>

        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Badge */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Role</label>
              <Badge variant={profile.role === 'staff' ? 'default' : 'secondary'}>
                {profile.role === 'staff' ? 'Staff' : 'Member'}
              </Badge>
            </div>

            {/* Email (Read-only) */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <Input
                type="email"
                value={profile.email}
                disabled
                className="bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>

            {/* Name (Editable) */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter your full name"
                className="border-input"
              />
            </div>

            {/* Save Button */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={saving || editName.trim() === profile.name}
                className="w-full sm:w-auto"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditName(profile.name)}
                disabled={saving}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Profile
