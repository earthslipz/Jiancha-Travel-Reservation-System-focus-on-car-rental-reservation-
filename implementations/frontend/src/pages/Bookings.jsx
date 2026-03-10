import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../services/api'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [cancelingId, setCancelingId] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings')
      setBookings(res.data)
    } catch (err) {
      toast.error('Failed to load bookings')
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) return navigate('/login')
    fetchBookings()
  }, [navigate])

  useEffect(() => {
    // Show success message from navigation state
    if (location.state?.message) {
      toast.success(location.state.message)
      // Clear the state to prevent showing again on refresh
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location, navigate])

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return

    setCancelingId(bookingId)
    try {
      await api.delete(`/bookings/${bookingId}`)
      toast.success('Booking cancelled successfully')
      fetchBookings()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel booking')
    } finally {
      setCancelingId(null)
    }
  }

  const handlePayNow = (booking) => {
    // Navigate to payment page with booking details
    navigate('/payment', {
      state: {
        bookingId: booking.id,
        carId: booking.car_id,
        pickup_date: booking.pickup_date,
        return_date: booking.return_date,
        car: {
          brand: booking.brand,
          model: booking.model,
          type: booking.type,
          location: booking.location,
          price_per_day: booking.total_price / Math.ceil((new Date(booking.return_date) - new Date(booking.pickup_date)) / (1000 * 60 * 60 * 24))
        },
        days: Math.ceil((new Date(booking.return_date) - new Date(booking.pickup_date)) / (1000 * 60 * 60 * 24)),
        originalPrice: booking.total_price,
        discountedPrice: booking.total_price,
        promo_code: null
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground mb-8">View and manage your car rental reservations</p>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">You haven't made any bookings yet</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Car</TableHead>
                    <TableHead>Pickup Date</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map(b => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {b.brand} {b.model}
                      </TableCell>
                      <TableCell>{b.pickup_date?.split('T')[0]}</TableCell>
                      <TableCell>{b.return_date?.split('T')[0]}</TableCell>
                      <TableCell className="font-semibold">฿{b.total_price}</TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${b.status === 'cancelled' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                          {b.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {b.status === 'pending' && (
                          <Button
                            size="sm"
                            className="mr-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm"
                            onClick={() => handlePayNow(b)}
                          >
                            💳 Pay Now
                          </Button>
                        )}
                        {(b.status === 'pending' || b.status === 'confirmed') && (
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={cancelingId === b.id}
                            onClick={() => handleCancelBooking(b.id)}
                          >
                            {cancelingId === b.id ? 'Cancelling...' : 'Cancel'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Bookings
