"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./CareerSuggestions.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  // Removed unused CardFooter
} from "D:/Coding/React programs/Hacktastic/frontend/src/components/ui/card.jsx"
import { Button } from "D:/Coding/React programs/Hacktastic/frontend/src/components/ui/button.jsx"
import { Badge } from "D:/Coding/React programs/Hacktastic/frontend/src/components/ui/badge.jsx"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "D:/Coding/React programs/Hacktastic/frontend/src/components/ui/select.jsx"
import { Briefcase, BookOpen, Star, Filter } from "lucide-react";

const CareerSuggestions = ({ testScores }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [skills, setSkills] = useState([0, 0]);
  const [interests, setInterests] = useState([0, 0]);
  const [career, setCareer] = useState("");
  const [error, setError] = useState("");

  const careerDatabase = [
    {
      id: 1,
      title: "Software Developer",
      description: "Design, build and maintain software systems and applications.",
      minRequirements: { logic: 70, problemSolving: 75, coding: 80 },
      salary: "₹70,000 - ₹120,000",
      education: "Bachelor's degree in Computer Science or related field",
      skills: ["JavaScript", "React", "Node.js", "Problem Solving"],
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Analyze and interpret complex data to help organizations make better decisions.",
      minRequirements: { math: 80, statistics: 85, programming: 70 },
      salary: "₹95,000 - ₹135,000",
      education: "Master's degree in Data Science, Statistics, or related field",
      skills: ["Python", "R", "Machine Learning", "Statistics"],
    },
    // Add more careers as needed
  ];

  const getTestScores = () => {
    const savedScores = localStorage.getItem("skillTestScores");
    if (savedScores) {
      return JSON.parse(savedScores);
    }
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
    };
  };

  const calculateMatchPercentage = (career, scores) => {
    const requirements = career.minRequirements;
    let totalScore = 0;
    let totalPossible = 0;

    for (const skill in requirements) {
      if (scores[skill]) {
        totalPossible += 100;
        const skillScore = Math.min(100, (scores[skill] / requirements[skill]) * 100);
        totalScore += skillScore;
      }
    }

    return totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
  };

  useEffect(() => {
    const scores = testScores || getTestScores();

    const matchedCareers = careerDatabase
      .map((career) => {
        const matchPercentage = calculateMatchPercentage(career, scores);
        return {
          ...career,
          matchPercentage,
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    setSuggestions(matchedCareers);
  }, [testScores]);

  const handlePredict = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/career/predict`,
        { skills, interests },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setCareer(response.data.career);
      setError("");
    } catch (err) {
      setError("Failed to predict career");
    }
  };

  const filteredSuggestions =
    filter === "all"
      ? suggestions
      : suggestions.filter((career) => career.matchPercentage >= Number.parseInt(filter));

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Career Suggestions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Based on your skill test results, we've identified the following career paths that might be a good fit for you.
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
  );
};

export default CareerSuggestions;