
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const SearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  showFilters,
  setShowFilters,
  selectedCategory,
  setSelectedCategory
}: SearchAndFilterProps) => {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search by name, specialization, or keyword..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select 
            defaultValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Coach type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Coaches</SelectItem>
              <SelectItem value="reneu">Reneu Coaches</SelectItem>
              <SelectItem value="business">Business Coaches</SelectItem>
              <SelectItem value="mind">Mental Coaches</SelectItem>
              <SelectItem value="body">Body Coaches</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border rounded-lg mb-6 animate-fade-in">
          <div>
            <h3 className="font-medium mb-3">Specialization</h3>
            <div className="space-y-2">
              {['Business', 'Life', 'Career', 'Leadership', 'Sports', 'Nutrition', 'Mental', 'Executive', 'Wellness'].map((spec) => (
                <div key={spec} className="flex items-center space-x-2">
                  <Checkbox id={`spec-${spec.toLowerCase()}`} />
                  <label
                    htmlFor={`spec-${spec.toLowerCase()}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {spec}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[0, 200]} 
                max={200} 
                step={5}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox id={`rating-${rating}`} />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
                  >
                    {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="availability-weekends" />
                <label
                  htmlFor="availability-weekends"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Weekends
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="availability-evenings" />
                <label
                  htmlFor="availability-evenings"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Evenings
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="availability-next-week" />
                <label
                  htmlFor="availability-next-week"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Available next week
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={selectedCategory === "all" ? "default" : "outline"} 
          className={selectedCategory !== "all" ? "bg-background hover:bg-primary/10 cursor-pointer" : ""}
          onClick={() => setSelectedCategory("all")}
        >
          All Coaches
        </Badge>
        <Badge 
          variant={selectedCategory === "reneu" ? "default" : "outline"} 
          className={selectedCategory !== "reneu" ? "bg-background hover:bg-primary/10 cursor-pointer" : ""}
          onClick={() => setSelectedCategory("reneu")}
        >
          Reneu Coaches
        </Badge>
        <Badge 
          variant={selectedCategory === "business" ? "default" : "outline"} 
          className={selectedCategory !== "business" ? "bg-background hover:bg-primary/10 cursor-pointer" : ""}
          onClick={() => setSelectedCategory("business")}
        >
          Business
        </Badge>
        <Badge 
          variant={selectedCategory === "mind" ? "default" : "outline"} 
          className={selectedCategory !== "mind" ? "bg-background hover:bg-primary/10 cursor-pointer" : ""}
          onClick={() => setSelectedCategory("mind")}
        >
          Mental
        </Badge>
        <Badge 
          variant={selectedCategory === "body" ? "default" : "outline"} 
          className={selectedCategory !== "body" ? "bg-background hover:bg-primary/10 cursor-pointer" : ""}
          onClick={() => setSelectedCategory("body")}
        >
          Body
        </Badge>
      </div>
    </div>
  );
};

export default SearchAndFilter;
