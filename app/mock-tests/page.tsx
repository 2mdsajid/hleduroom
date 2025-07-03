import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Play, Lock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mock Tests - Hleduroom",
  description: "Practice with our comprehensive mock test series for NEB, CEE, and MBBS entrance exams",
}

const mockTests = [
  {
    id: 1,
    title: "MBBS Entrance Mock Test #1",
    description: "Comprehensive test covering Physics, Chemistry, and Biology",
    questions: 100,
    duration: 120,
    participants: 2500,
    difficulty: "Advanced",
    category: "MBBS",
    isFree: true,
    price: 0,
  },
  {
    id: 2,
    title: "NEB Class 12 Physics Mock Test",
    description: "Complete physics test based on NEB syllabus",
    questions: 50,
    duration: 90,
    participants: 1800,
    difficulty: "Intermediate",
    category: "NEB",
    isFree: false,
    price: 500,
  },
  {
    id: 3,
    title: "CEE Engineering Mock Test Series",
    description: "Full-length CEE practice test with detailed solutions",
    questions: 120,
    duration: 150,
    participants: 1200,
    difficulty: "Advanced",
    category: "CEE",
    isFree: false,
    price: 1000,
  },
]

const leaderboard = [
  { rank: 1, name: "Priya Sharma", score: 95, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 2, name: "Rajesh Thapa", score: 92, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 3, name: "Anita Gurung", score: 89, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 4, name: "Suresh Rai", score: 87, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 5, name: "Maya Tamang", score: 85, avatar: "/placeholder.svg?height=40&width=40" },
]

export default function MockTestsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mock Tests & Practice</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test your knowledge with our comprehensive mock test series designed to simulate real exam conditions
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Free Demo Test */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Free Demo Mock Test</CardTitle>
                  <Badge className="bg-green-600">FREE</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Try our platform with a free demo test. Experience the interface and get a feel for our question
                  quality.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span>25 Questions</span>
                  <span>30 Minutes</span>
                  <span>All Subjects</span>
                </div>
                <Button className="w-full sm:w-auto">
                  <Play className="h-4 w-4 mr-2" />
                  Start Free Test
                </Button>
              </CardContent>
            </Card>

            {/* Mock Tests Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Mock Tests</h2>
              <div className="grid gap-6">
                {mockTests.map((test) => (
                  <Card key={test.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-2">{test.title}</CardTitle>
                          <p className="text-gray-600 text-sm">{test.description}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge variant="secondary">{test.category}</Badge>
                          {test.isFree ? (
                            <Badge className="bg-green-600">FREE</Badge>
                          ) : (
                            <Badge variant="outline">Rs. {test.price}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{test.questions}</div>
                          <div className="text-xs text-gray-600">Questions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{test.duration}</div>
                          <div className="text-xs text-gray-600">Minutes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{test.participants}</div>
                          <div className="text-xs text-gray-600">Participants</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-blue-600">{test.difficulty}</div>
                          <div className="text-xs text-gray-600">Level</div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        {test.isFree ? (
                          <Button className="flex-1">
                            <Play className="h-4 w-4 mr-2" />
                            Start Test
                          </Button>
                        ) : (
                          <>
                            <Button className="flex-1">
                              <Lock className="h-4 w-4 mr-2" />
                              Buy & Start
                            </Button>
                            <Button variant="outline">Preview</Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Daily Practice Section */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Practice Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Solve 5 new questions every day to keep your preparation on track.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">Physics</div>
                    <div className="text-sm text-gray-600">Today's Questions</div>
                    <Button size="sm" className="mt-2">
                      Solve Now
                    </Button>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">Chemistry</div>
                    <div className="text-sm text-gray-600">Today's Questions</div>
                    <Button size="sm" className="mt-2">
                      Solve Now
                    </Button>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">Biology</div>
                    <div className="text-sm text-gray-600">Today's Questions</div>
                    <Button size="sm" className="mt-2">
                      Solve Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div key={user.rank} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            user.rank === 1
                              ? "bg-yellow-500 text-white"
                              : user.rank === 2
                                ? "bg-gray-400 text-white"
                                : user.rank === 3
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {user.rank}
                        </div>
                      </div>
                      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                      </div>
                      <div className="text-sm font-semibold text-blue-600">{user.score}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Premium Test Series CTA */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Premium Test Series</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800 mb-4">
                  <li>• 100+ Mock Tests</li>
                  <li>• Detailed Performance Analysis</li>
                  <li>• All India Ranking</li>
                  <li>• Previous Year Papers</li>
                  <li>• Expert Solutions</li>
                </ul>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-blue-900">Rs. 2,999</div>
                  <div className="text-sm text-blue-700 line-through">Rs. 4,999</div>
                </div>
                <Button className="w-full">Get Premium Access</Button>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Tests Completed</span>
                      <span>12/20</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Score</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Current Rank</span>
                      <span>#245</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View Detailed Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
