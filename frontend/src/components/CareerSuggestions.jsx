"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "C:/Users/bhavy/Tic_Tech_Toe-demo-/frontend/src/components/ui/card.jsx"
import { Button } from "C:/Users/bhavy/Tic_Tech_Toe-demo-/frontend/src/components/ui/button.jsx"
import { Badge } from "C:/Users/bhavy/Tic_Tech_Toe-demo-/frontend/src/components/ui/badge.jsx"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "C:/Users/bhavy/Tic_Tech_Toe-demo-/frontend/src/components/ui/select.jsx"
import { Briefcase, BookOpen, Star, Filter } from "lucide-react"
import './CareerSuggestions.css'

// This component would typically get data from a database
// For now, we'll simulate getting data from localStorage or props
const CareerSuggestions = ({ testScores }) => {
  const [suggestions, setSuggestions] = useState([])
  const [filter, setFilter] = useState("all")

  // Sample career data - in a real app, this would be more extensive
  const careerDatabase = [
    {
      id: 1,
      title: "Software Developer",
      description: "Design, build and maintain software systems and applications.",
      minRequirements: { logic: 70, problemSolving: 75, coding: 80 },
      salary: "₹70,000 - ₹120,000",
      growth: "22% (Much faster than average)",
      education: "Bachelor's degree in Computer Science or related field",
      skills: ["JavaScript", "React", "Node.js", "Problem Solving"],
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      minRequirements: { math: 80, statistics: 85, programming: 70 },
      salary: "₹95,000 - ₹135,000",
      growth: "36% (Much faster than average)",
      education: "Master's degree in Data Science, Statistics, or related field",
      skills: ["Python", "R", "Machine Learning", "Statistics"],
    },
    {
      id: 3,
      title: "UX/UI Designer",
      description: "Create intuitive, accessible interfaces for digital products.",
      minRequirements: { design: 80, userEmpathy: 85, creativity: 75 },
      salary: "₹65,000 - ₹110,000",
      growth: "13% (Faster than average)",
      education: "Bachelor's degree in Design or related field",
      skills: ["Figma", "User Research", "Wireframing", "Visual Design"],
    },
    {
      id: 4,
      title: "Digital Marketing Specialist",
      description: "Plan and execute marketing campaigns across digital channels.",
      minRequirements: { communication: 75, analytics: 70, creativity: 80 },
      salary: "₹50,000 - ₹85,000",
      growth: "10% (Faster than average)",
      education: "Bachelor's degree in Marketing or related field",
      skills: ["SEO", "Content Marketing", "Social Media", "Analytics"],
    },
    {
      id: 5,
      title: "Project Manager",
      description: "Plan, execute, and close projects while ensuring they're delivered on time and within budget.",
      minRequirements: { organization: 85, leadership: 80, communication: 85 },
      salary: "₹75,000 - ₹125,000",
      growth: "8% (As fast as average)",
      education: "Bachelor's degree in Business or related field",
      skills: ["Agile", "Scrum", "Risk Management", "Stakeholder Communication"],
    },
  ]

  // Mock function to get test scores if not provided as props
  const getTestScores = () => {
    // Try to get scores from localStorage
    const savedScores = localStorage.getItem("skillTestScores")
    if (savedScores) {
      return JSON.parse(savedScores)
    }

    // Return mock data if nothing is found
    return {
      logic: 85,
      problemSolving: 90,
      coding: 75,
      math: 70,
      statistics: 65,
      programming: 80,
      design: 60,
      userEmpathy: 75,
      creativity: 85,
      communication: 80,
      analytics: 75,
      organization: 70,
      leadership: 65,
    }
  }

  // Calculate career match percentage based on test scores
  const calculateMatchPercentage = (career, scores) => {
    const requirements = career.minRequirements
    let totalScore = 0
    let totalPossible = 0

    for (const skill in requirements) {
      if (scores[skill]) {
        totalPossible += 100
        const skillScore = Math.min(100, (scores[skill] / requirements[skill]) * 100)
        totalScore += skillScore
      }
    }

    return totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0
  }

  // Generate career suggestions based on test scores
  useEffect(() => {
    const scores = testScores || getTestScores()

    const matchedCareers = careerDatabase
      .map((career) => {
        const matchPercentage = calculateMatchPercentage(career, scores)
        return {
          ...career,
          matchPercentage,
        }
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage)

    setSuggestions(matchedCareers)
  }, [testScores])

  // Filter suggestions
  const filteredSuggestions =
    filter === "all" ? suggestions : suggestions.filter((career) => career.matchPercentage >= Number.parseInt(filter))

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Career Suggestions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your skill test results, we've identified the following career paths that might be a good fit for
          you.
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filter by match:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by match" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Suggestions</SelectItem>
              <SelectItem value="90">90% Match & Above</SelectItem>
              <SelectItem value="80">80% Match & Above</SelectItem>
              <SelectItem value="70">70% Match & Above</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuggestions.map((career) => (
          <Card key={career.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{career.title}</CardTitle>
                <Badge variant={career.matchPercentage >= 90 ? "default" : "outline"} className="ml-2">
                  {career.matchPercentage}% Match
                </Badge>
              </div>
              <CardDescription>{career.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Briefcase className="h-4 w-4" /> Salary Range
                  </h4>
                  <p className="text-sm text-gray-600">{career.salary}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4" /> Education
                  </h4>
                  <p className="text-sm text-gray-600">{career.education}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4" /> Key Skills
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {career.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            {/* <CardFooter>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </CardFooter> */}
          </Card>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No career suggestions match your current filter.</p>
          <Button variant="outline" className="mt-4" onClick={() => setFilter("all")}>
            Show All Suggestions
          </Button>
        </div>
      )}
    </div>
  )
}

export default CareerSuggestions
