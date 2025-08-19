"use client";

import * as React from "react";
import { BrainCircuit, Dices, Heart, Library, Plus, Sparkles, TimerIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialActs, type Act, type ActCategory } from "@/lib/acts";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { generatePersonalizedChallenge } from "@/ai/flows/generate-personalized-challenge";
import { Skeleton } from "@/components/ui/skeleton";


const ChallengeView = ({ challenge }: { challenge: Act | null }) => {
  const [timeLeft, setTimeLeft] = React.useState(10 * 60);
  const [isTimerActive, setIsTimerActive] = React.useState(false);

  React.useEffect(() => {
    if (!challenge) return;
    setTimeLeft(challenge.timer || 10 * 60);
    setIsTimerActive(false);
  }, [challenge]);

  React.useEffect(() => {
    if (!isTimerActive || timeLeft <= 0) {
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isTimerActive, timeLeft]);

  if (!challenge) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-2xl font-headline flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          {challenge.title}
        </DialogTitle>
        <DialogDescription>{challenge.description}</DialogDescription>
      </DialogHeader>
      <div className="border-t border-dashed pt-4">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <TimerIcon className="text-primary w-5 h-5" />
          مؤقت التحدي
        </h3>
        <div className="flex items-center justify-center gap-4 bg-muted/50 p-4 rounded-lg">
          <div className="text-5xl font-mono font-bold text-primary tracking-widest">
            <span>{String(minutes).padStart(2, "0")}</span>:
            <span>{String(seconds).padStart(2, "0")}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setIsTimerActive(!isTimerActive)}
              disabled={timeLeft <= 0}
              variant={isTimerActive ? "secondary" : "default"}
            >
              {isTimerActive ? "إيقاف مؤقت" : "ابدأ"}
            </Button>
            <Button
              onClick={() => {
                setIsTimerActive(false);
                setTimeLeft(challenge.timer || 10 * 60);
              }}
              variant="outline"
            >
              إعادة ضبط
            </Button>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">إغلاق</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
};


const addActFormSchema = z.object({
  title: z.string().min(3, { message: "يجب أن يكون العنوان 3 أحرف على الأقل." }),
  description: z.string().min(10, { message: "يجب أن يكون الوصف 10 أحرف على الأقل." }),
  category: z.enum(["vaginal", "anal", "tasting", "position"]),
});

const ActLibrary = ({ acts, onSelectChallenge, onAddAct }: { acts: Act[], onSelectChallenge: (act: Act) => void, onAddAct: (act: Act) => void }) => {
  const [filter, setFilter] = React.useState<ActCategory | "all">("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof addActFormSchema>>({
    resolver: zodResolver(addActFormSchema),
    defaultValues: { title: "", description: "", category: "vaginal" },
  });

  const { toast } = useToast();

  const handleAddSubmit = (values: z.infer<typeof addActFormSchema>) => {
    onAddAct({
      id: `custom-${Date.now()}`,
      ...values,
      timer: 600,
    });
    toast({
      title: "نجاح!",
      description: "تمت إضافة الأمر المخصص بنجاح.",
    });
    setIsAddDialogOpen(false);
    form.reset();
  };

  const filteredActs = acts.filter(
    (act) => filter === "all" || act.category === filter
  );

  const categories: { key: ActCategory | "all"; name: string, icon: React.ElementType }[] = [
    { key: "all", name: "الكل", icon: Library },
    { key: "vaginal", name: "مهبلي", icon: Heart },
    { key: "anal", name: "شرجي", icon: Heart },
    { key: "tasting", name: "تذوق", icon: Sparkles },
    { key: "position", name: "أوضاع", icon: Dices },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.key}
            variant={filter === cat.key ? "default" : "outline"}
            onClick={() => setFilter(cat.key)}
            className="capitalize"
          >
            <cat.icon className="mr-2 h-4 w-4" />
            {cat.name}
          </Button>
        ))}
        <Button variant="secondary" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          أضف أمراً مخصصاً
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredActs.map((act) => (
          <Card
            key={act.id}
            className="flex flex-col hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="font-headline text-xl">{act.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="line-clamp-3">
                {act.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => onSelectChallenge(act)}>
                <Sparkles className="mr-2 h-4 w-4" />
                ابدأ التحدي
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>أضف أمراً مخصصاً</DialogTitle>
            <DialogDescription>
              أضف تحديًا جديدًا إلى مكتبتك الشخصية.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العنوان</FormLabel>
                    <FormControl>
                      <Input placeholder="مثال: قبلة فرنسية لمدة 5 دقائق" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الوصف</FormLabel>
                    <FormControl>
                      <Textarea placeholder="صف التحدي بالتفصيل..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>الفئة</FormLabel>
                     <select {...field} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}>
                      {categories.filter(c => c.key !== 'all').map(c => (
                        <option key={c.key} value={c.key}>{c.name}</option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">إضافة</Button>
                 <DialogClose asChild>
                    <Button type="button" variant="secondary">إلغاء</Button>
                 </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};


const RandomChallenge = ({ acts, onSelectChallenge }: { acts: Act[], onSelectChallenge: (act: Act) => void }) => {
    
  const handleSpin = () => {
    const randomIndex = Math.floor(Math.random() * acts.length);
    const randomAct = acts[randomIndex];
    onSelectChallenge(randomAct);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-card rounded-xl shadow-lg">
        <Dices className="h-20 w-20 text-primary animate-pulse" />
        <h2 className="mt-4 text-3xl font-headline font-bold">تحدي عشوائي</h2>
        <p className="mt-2 max-w-md text-muted-foreground">
            هل أنت مستعد للمفاجأة؟ اضغط على الزر أدناه لاختيار تحدي عشوائي وإضفاء بعض الإثارة!
        </p>
        <Button size="lg" className="mt-8 text-lg" onClick={handleSpin}>
            <Sparkles className="mr-3 h-6 w-6" />
            دور!
        </Button>
    </div>
  )
}

const aiFormSchema = z.object({
  pastInteractions: z.string().min(10, { message: "يرجى وصف التفاعلات السابقة بمزيد من التفصيل." }),
  preferences: z.string().min(10, { message: "يرجى وصف تفضيلاتك بمزيد من التفصيل." }),
});

const AiChallengeGenerator = ({ onSelectChallenge }: { onSelectChallenge: (act: Act) => void}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [generatedChallenge, setGeneratedChallenge] = React.useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof aiFormSchema>>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: { pastInteractions: "", preferences: "" },
  });

  const onSubmit = async (values: z.infer<typeof aiFormSchema>) => {
    setIsLoading(true);
    setGeneratedChallenge(null);
    try {
      const result = await generatePersonalizedChallenge(values);
      setGeneratedChallenge(result.challenge);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء تحدي. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const viewGeneratedChallenge = () => {
    if(generatedChallenge) {
      onSelectChallenge({
        id: `ai-${Date.now()}`,
        title: "تحدي مولد بالذكاء الاصطناعي",
        description: generatedChallenge,
        category: 'position',
        timer: 600
      })
    }
  }

  return (
    <Card className="max-w-3xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <BrainCircuit className="mx-auto h-16 w-16 text-primary" />
        <CardTitle className="text-3xl font-headline">مولد التحديات بالذكاء الاصطناعي</CardTitle>
        <CardDescription>
          احصل على تحديات مخصصة تمامًا لكما بناءً على تفضيلاتكما وتفاعلاتكما السابقة.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pastInteractions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التفاعلات السابقة</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="مثال: نستمتع بالأوضاع الجديدة ولكننا نفضل الإيلاج اللطيف. آخر مرة جربنا تحدي تذوق..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    صف بإيجاز بعض الأنشطة أو التحديات التي استمتعتما بها في الماضي.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التفضيلات الحالية</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="مثال: نرغب في تجربة شيء أكثر جرأة، ربما يتضمن ألعاب تمثيل الأدوار أو تحديات سريعة..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    ما هو نوع التجربة التي تبحثان عنها الآن؟
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "جاري الإنشاء..." : "أنشئ تحديًا شخصيًا"}
            </Button>
          </form>
        </Form>
        
        {isLoading && (
            <div className="mt-6 space-y-4">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        )}

        {generatedChallenge && (
            <Card className="mt-6 bg-primary/10">
                <CardHeader>
                    <CardTitle>التحدي المقترح لكما!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">{generatedChallenge}</p>
                </CardContent>
                <CardFooter>
                    <Button onClick={viewGeneratedChallenge} className="w-full">
                         <Sparkles className="mr-2 h-4 w-4" />
                        ابدأ هذا التحدي
                    </Button>
                </CardFooter>
            </Card>
        )}
      </CardContent>
    </Card>
  );
};


export default function Home() {
  const [acts, setActs] = React.useState<Act[]>(initialActs);
  const [selectedChallenge, setSelectedChallenge] = React.useState<Act | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleSelectChallenge = (act: Act) => {
    setSelectedChallenge(act);
    setIsDialogOpen(true);
  };

  const handleAddAct = (act: Act) => {
    setActs(prev => [act, ...prev]);
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-headline font-extrabold text-primary">Habibi's Heat</h1>
          <p className="text-muted-foreground text-lg mt-2">لعبة الحب الخاص بكم</p>
        </header>

        <Tabs defaultValue="library" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-primary/10">
            <TabsTrigger value="library">
              <Library className="mr-2 h-4 w-4" />
              مكتبة الأفعال
            </TabsTrigger>
            <TabsTrigger value="random">
              <Dices className="mr-2 h-4 w-4" />
              تحدي عشوائي
            </TabsTrigger>
            <TabsTrigger value="ai">
              <BrainCircuit className="mr-2 h-4 w-4" />
              مولد التحديات
            </TabsTrigger>
          </TabsList>
          <TabsContent value="library" className="mt-6">
            <ActLibrary acts={acts} onSelectChallenge={handleSelectChallenge} onAddAct={handleAddAct} />
          </TabsContent>
          <TabsContent value="random" className="mt-6">
            <RandomChallenge acts={acts} onSelectChallenge={handleSelectChallenge} />
          </TabsContent>
          <TabsContent value="ai" className="mt-6">
            <AiChallengeGenerator onSelectChallenge={handleSelectChallenge} />
          </TabsContent>
        </Tabs>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <ChallengeView challenge={selectedChallenge} />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
