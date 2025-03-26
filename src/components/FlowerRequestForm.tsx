
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/Button";
import { toast } from "sonner";

interface FlowerRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  flowerName: string;
  flowerImage: string;
}

const FlowerRequestForm: React.FC<FlowerRequestFormProps> = ({ 
  isOpen, 
  onClose, 
  flowerName,
  flowerImage
}) => {
  const [quantity, setQuantity] = useState("1");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      // Here you would normally send the data to a server
      console.log({
        flowerName,
        quantity: parseInt(quantity),
        deliveryDate,
        notes
      });
      
      setIsSubmitting(false);
      onClose();
      
      // Reset form
      setQuantity("1");
      setDeliveryDate("");
      setNotes("");
      
      // Show success message
      toast.success("Your flower request has been submitted successfully! We'll get back to you soon.");
    }, 1000);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Request Flowers</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-start gap-4 my-4">
          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
            <img 
              src={flowerImage} 
              alt={flowerName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-lg">{flowerName}</h3>
            <p className="text-muted-foreground text-sm">Please fill out the form below to request these flowers. Our team will contact you with availability and pricing information.</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity (stems/bunches)</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="delivery-date">Preferred Delivery Date</Label>
            <Input
              id="delivery-date"
              type="date"
              min={minDate}
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Special Requests or Notes</Label>
            <Textarea
              id="notes"
              placeholder="Let us know if you have any specific requirements or questions"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <DialogFooter className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-secondary hover:bg-secondary/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlowerRequestForm;
